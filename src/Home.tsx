import React, { useEffect, useState } from 'react';

import request from 'request';

import {
    Link
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

import _ from "lodash";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1), //grid padding
        textAlign: 'center',
        color: theme.palette.text.secondary,
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between"
    },
    mainContainer: {
        display: 'flex',
        flexDirection: "row",
        width: '100%'
    },
    link: {
        width: '70%',
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between"
    },
}));
export interface SearchedCompany {
    name: string;
    symbol: string;
}

type Props = {
    portfolioCompanies: SearchedCompany[];
    setPortfolioCompanies: any; /*(SearchedCompany[])=> void*/
}

export const Home = ({ portfolioCompanies, setPortfolioCompanies }: Props) => {
    const [companyName, setCompanyName] = useState("");
    const [searchedCompanies, setSearchedCompanies] = useState<SearchedCompany[]>([])
    //const [portfolioCompanies, setPortfolioCompanies] = useState<SearchedCompany[]>([])
    useEffect(() => {
        if (companyName) {
            console.log(companyName)

            const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${companyName}&apikey=${process.env.REACT_APP_STOCK_KEY}`

            request.get({
                url: url,
                json: true,
                headers: { 'User-Agent': 'request' }
            }, (err, res, data) => {
                if (err) {
                    console.log('Error:', err);
                } else if (res.statusCode !== 200) {
                    console.log('Status:', res.statusCode);
                } else {
                    setSearchedCompanies(data.bestMatches.map((company: { [x: string]: any; }) => ({ symbol: company["1. symbol"], name: company["2. name"] })));
                }
            });
        }
    }, [companyName]);
    const inputHandler = _.debounce(setCompanyName, 400);
    const classes = useStyles();
    const addCompanyToPortfolio = (company: SearchedCompany) => {
        if (!portfolioCompanies.find(current => current.symbol === company.symbol)) {
            setPortfolioCompanies([...portfolioCompanies, company])
        }
    }
    const removeCompanyToPortfolio = (company: SearchedCompany) => {
        setPortfolioCompanies(portfolioCompanies.filter(current => current.symbol !== company.symbol))
    }
    return (
        <Box>
            <React.Fragment>
                <Box className={classes.mainContainer}>
                    <Box sx={{
                        width: "40%"
                    }}>
                        <TextField id="standard-basic" label="Company name" variant="standard" onChange={e => inputHandler(e.target.value)} />
                        {searchedCompanies.map((company: SearchedCompany) => {
                            console.log(company)
                            return (
                                <Grid item key={company.symbol}>
                                    <Paper className={classes.paper}>
                                        <div>{company.symbol}</div>
                                        <div>{company.name}</div>
                                        <Button variant="outlined" onClick={() => addCompanyToPortfolio(company)}>+</Button>
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Box>
                    <Box sx={{
                        width: "40%"
                    }}>
                        My Portfolio
                        {portfolioCompanies.map((company: SearchedCompany) => {
                            return (
                                <Grid item key={company.symbol}>
                                    <Paper className={classes.paper}>
                                        <Link to={`/about${company.symbol}`} className={classes.link}>
                                            <div>{company.symbol}</div>
                                            <div>{company.name}</div>
                                        </Link>
                                        <Button variant="outlined" onClick={() => removeCompanyToPortfolio(company)}>Remove</Button>
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Box>
                </Box>
            </React.Fragment>
        </Box>
    );
}
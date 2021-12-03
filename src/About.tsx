import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import {
    Link
} from "react-router-dom";
import request from 'request';

import styled from 'styled-components';

import { convertLongNumberToString } from './utils'

const SectionContainer = styled.div`
margin:30px;
`;

export const About = () => {
    const [companyInfo, setCompanyInfo] = useState<{
        Name: string;
        Address: string;
        MarketCapitalization: string;
        Description: string;
    } | undefined>(undefined);
    const { company } = useParams();
    useEffect(() => {
        const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${company}&apikey=${process.env.REACT_APP_STOCK_KEY}`
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
                setCompanyInfo(data);
            }
        });
    },
        [company]);
    return (
        <div>
            <Button variant="outlined"><Link to="/">Back</Link></Button>
            <br />
            <SectionContainer> Name: {companyInfo?.Name}</SectionContainer>
            <br />
            <SectionContainer> Address: {companyInfo?.Address}</SectionContainer>
            <br />
            <SectionContainer>  MarketCapitalization: {companyInfo?.MarketCapitalization ? convertLongNumberToString(parseInt(companyInfo.MarketCapitalization)) : ""}</SectionContainer>
            <br />
            <SectionContainer>  {companyInfo?.Description}</SectionContainer>
        </div>
    );
}

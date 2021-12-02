import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import {
    Link
} from "react-router-dom";
import request from 'request';

export const About = () => {
    const [companyInfo, setCompanyInfo] = useState<{
        Name: string;
        Address: string;
        MarketCapitalization: string;
        Description: string;
    } | undefined>(undefined);
    const { company } = useParams();
    useEffect(() => {
        const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${company}&apikey=7827ROG6VN3VFT4V`
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
            <br style={{lineHeight:"20px"}}/>
            Name: {companyInfo?.Name}
            <br />
            Address: {companyInfo?.Address}
            <br />
            MarketCapitalization: {companyInfo?.MarketCapitalization}
            <br />
            {companyInfo?.Description}
        </div>
    );
}

export default (state: {
    portfolioCompanies: {
        name: string;
        symbol: string;
    }[]
}, action: {
    type: string, payload: {
        name?: string;
        symbol: string;
    }
}) => {
    switch (action.type) {
        case 'addCompany':
            return { portfolioCompanies: [...state.portfolioCompanies, action.payload] };
        case 'removeCompany':
            return { portfolioCompanies: state.portfolioCompanies };
        default:
            throw new Error();
    }
}
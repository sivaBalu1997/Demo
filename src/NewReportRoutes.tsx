import React from 'react'
import { Route, Switch } from "react-router-dom";
import Product from 'pages/NewReports/Category';
import SalesOverView from 'pages/NewReports/SalesOverView';

const NewReportRoutes: React.FC = () => {
    return (
        <Switch>
            {/* <Route exact path="/sales-over-view-reports" component={SalesOverView} />
            <Route path="/product-reports" component={Product} /> */}
            {/* <Route path="/contact" component={<ContactPage />} /> */}
            {/* <Route path="*" component={<Navigate to="/" replace />} /> Redirect unknown paths */}
        </Switch>
    );
};

export default NewReportRoutes

import Billing from 'components/billing'
import BillingHistory from 'components/billing/billingHistory'
import CancelSubscription from 'components/billing/cancelSubscription'
import ChangePlan from 'components/billing/changePlan'
import Employees from 'components/employees'
import AddEmployee from 'components/employees/AddEmployee'
import EmployeeDetails from 'components/employees/EmployeeDetails'
import AddItem from 'components/menuItem/AddItem'
import EmptyMenu from 'components/menuItems/EmtyMenu'
import AddOffer from 'components/offers/AddOffer'
import CreateOffer from 'components/offers/CreateOffer'
import Offerdetails from 'components/offers/Offerdetails'
import PreviewOffer from 'components/offers/PreviewOffer'
import TemplateOffer from 'components/offers/TemplateOffer'
import Payment from 'components/payment'
import Report from 'components/report'
import ReviewMenu from 'components/reviewMenu'
import StickWithUs from './components/billing/stickWithUs'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DefaultPage from 'components/reports-sprint99/screens/DefaultPage/DefaultPage'
import CustomerInsights from 'components/reports-sprint99/screens/CustomerInsights'
import Sales from 'components/reports-sprint99/screens/Sales'
import ProductInsights from 'components/reports-sprint99/screens/ProductInsights'
import GenAiReports from 'components/reports-sprint99/screens/GenAi'
import CheckIn from 'components/reports-sprint99/screens/CheckIn'
import EmployeeInsights from 'components/reports-sprint99/screens/EmployeeInsights'
import { ThemeProvider } from 'components/reports-sprint99/context/ThemeContext'
import CustIns from 'components/reports-sprint99/screens/CustomerInsi'

function Routers() {
  return (
    <Switch>
        <Route exact path="/review" component={ReviewMenu} />
        <Route exact path="/management/employees" component={Employees} />
        <Route exact path="/management/Offers" component={Offerdetails} />
        <Route
          exact
          path="/management/Offers/TemplateOffer"
          component={TemplateOffer}
        />
        <Route exact path="/management/Offers/AddOffer" component={AddOffer} />
        <Route
          exact
          path="/management/Offers/CreateOffer"
          component={CreateOffer}
        />
        <Route
          exact
          path="/management/Offers/EditOffer"
          component={CreateOffer}
        />
        <Route
          exact
          path="/management/Offers/PreviewOffer"
          component={PreviewOffer}
        />

        {/* <Route exact path=/management/report/32 component={CustomerInsights} /> */}
        <ThemeProvider>
        <Route
          exact
          path="/management/live-reports"
          component={CustomerInsights}
        />

          <Route
          exact
          path="/management/sales"
          component={Sales}
        />
          <Route
          exact
          path="/management/employee-insights"
          component={EmployeeInsights}
        />
          <Route
          exact
          path="/management/product-insights"
          component={ProductInsights}
        />
        <Route
          exact
          path="/management/check-in"
          component={CheckIn}
        />
         <Route
          exact
          path="/management/gen-ai-reports"
          component={GenAiReports}
        />
        <Route
          exact
          path="/management/customer-insights"
          component={CustIns}
        />
        </ThemeProvider>
        
        <Route
          exact
          path="/management/report/32"
          component={() => <Report id={"32"} title={"Sales report"} />}
        />       
        <Route
          exact
          path="/management/report/2"
          component={() => <Report id={"2"} title={"Checkin - Daily report"} />}
        />
        <Route
          exact
          path="/management/report/4"
          component={() => <Report id={"4"} title={"Order insights"} />}
        />
        <Route
          exact
          path="/management/report/5"
          component={() => (
            <Report id={"5"} title={"Sales - Transaction report"} />
          )}
        />
        Product insights
        <Route
          exact
          path="/management/report/12"
          component={() => <Report id={"12"} title={"Sales insights"} />}

          // /> <Route
          // exact
          // path="/management/report/8"
          // component={() => (
          //   <Report id={"8"} title={"Product insights"} />
          // )}
        />
        <Route
          exact
          path="/management/employees/add"
          component={() => <AddEmployee />}
        />
        <Route
          exact
          path="/management/employees/add/:id"
          component={() => <AddEmployee />}
        />
        <Route 
          exact 
          path="/management/employees/details/:id"
          component={() => <EmployeeDetails />}  
        />
        <Route exact path="/management/billing" component={() => <Billing />} />
        <Route
          exact
          path="/management/billing/changeplan"
          component={() => <ChangePlan />}
        />
        <Route
          exact
          path="/management/billing/cancelsubscription"
          component={() => <CancelSubscription />}
        />
        <Route
          exact
          path="/management/billing/stickWithUs"
          component={() => <StickWithUs />}
        />
        <Route
          exact
          path="/management/billing/history"
          component={() => <BillingHistory />}
        />
        <Route
          exact
          path="/management/menu/Items"
          component={() => <EmptyMenu />}
        />
        <Route
          exact
          path="/management/menu/Items/Add"
          component={() => <AddItem />}
        />
        <Route
          exact
          path="/management/menu/Items/update/:itemId"
          component={() => <AddItem />}
        />
        <Route
          exact
          path="/management/payment"
          component={() => <Payment title={"Payment"} />}
        />
      </Switch>
  )
}

export default Routers

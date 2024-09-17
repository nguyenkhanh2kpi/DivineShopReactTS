import React, { Fragment } from "react";
import Header from "../../components/shop/Header";
import Footer from "../../components/shop/Footer";
import Banner from "../../components/shop/Banner";
import { ContentUser } from "./ContentUser";
import { useParams } from "react-router";



export const BaseUser = () => {
    const pamas = useParams();
    const tabName = pamas.tab;
    let title = '';
    switch (tabName) {
        case 'wishlist':
            title = 'Wish List';
            break;
        case 'account':
            title = 'Account';
            break;
        case 'history':
            title = 'Order History';
            break;
        case 'security':
            title = 'Security';
            break;
        case 'transaction':
            title = 'Transaction History';
            break;
        default:
            title = 'Default Title';
    }
    return (
        <>
            <Header />
            <Banner title={title} />
            <Fragment>
                <ContentUser tab={tabName ? tabName: ""}/>
            </Fragment>
            <Footer />
        </>
    );
};

import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const ShopPage = ({ match }) => {
    console.log(match.path)
    return (
        <div className='shop-page'>
            <Route exact component={CollectionsOverview} path={`${match.path}`}></Route>
            <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
        </div>
    )
    
}


export default ShopPage;
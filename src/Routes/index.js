import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from '../layout/MainLayout';

const Cricketers = React.lazy(() => import('../components/cricketers'));
const CricketerDetails = React.lazy(() => import('../components/cricketer-details'));
const Error = React.lazy(() => import('../components/Error'));

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={
                        <Suspense fallback={< div>Loading...</div>}>
                            <Cricketers />
                        </Suspense>
                    } />
                    <Route path="cricketer/:id" element={
                        <Suspense fallback={< div>Loading...</div>}>
                            <CricketerDetails />
                        </Suspense>
                    } />
                    <Route path="*" element={
                        <Suspense fallback={< div>Loading...</div>}>
                            <Error />
                        </Suspense>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

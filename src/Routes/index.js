import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cricketers from '../components/cricketers';
import CricketerDetails from '../components/cricketer-details';
import Error from '../components/Error';
import Layout from '../layout/MainLayout';

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<Cricketers />} />
                    <Route path="cricketer/:id" element={<CricketerDetails />} />
                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

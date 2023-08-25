import React from "react";
import { createRoot } from 'react-dom/client';
import 'regenerator-runtime/runtime'
import { BrowserRouter as Router } from "react-router-dom";

import { App } from './components/App';

const root = createRoot(document.getElementById("root"));
root.render(
    <Router>
        <App />
    </Router>
);
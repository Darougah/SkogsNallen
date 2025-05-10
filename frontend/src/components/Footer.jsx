

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <footer className='section__container footer__container'>
                <div className='footer__col'>
                    <h4>KONTAKTINFORMATION</h4>
                    <p>
                        <span><i className="ri-map-pin-2-fill"></i></span>
                        19242 Stupvägen 75, Sollentuna, Sverige
                    </p>
                    <p>
                        <span><i className="ri-mail-fill"></i></span>
                        kontakt@skogsnallen.se
                    </p>
                    <p>
                        <span><i className="ri-phone-fill"></i></span>
                        (+46) 73-613 00 70
                    </p>
                </div>

                <div className='footer__col'>
                    <h4>OM SKOGSNALLEN</h4>
                    <Link to="/">Hem</Link>
                    <Link to="/pages/about">Om Oss</Link>
                    <Link to="/pages/careers">Jobba med oss</Link>
                    <Link to="/pages/terms">Villkor & Regler</Link>
                </div>

                <div className='footer__col'>
                    <h4>SUPPORT</h4>
                    <Link to="/pages/help">Hjälp & Support</Link>
                    <Link to="/dashboard/orders">Spåra din beställning</Link>
                </div>
            </footer>

            <div className='footer__bar'>
                Upphovsrätt © 2025 av SkogsNallen. Alla rättigheter förbehållna.
            </div>
        </>
    );
};

export default Footer;

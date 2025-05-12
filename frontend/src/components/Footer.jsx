import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <footer className="max-w-screen-xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-700">
                <div>
                    <h4 className="text-lg font-bold mb-4 text-black">KONTAKTINFORMATION</h4>
                    <p className="mb-2"><i className="ri-map-pin-2-fill text-green-600 mr-2"></i>19242 Stupvägen 75, Sollentuna, Sverige</p>
                    <p className="mb-2"><i className="ri-mail-fill text-green-600 mr-2"></i>kontakt@skogsnallen.se</p>
                    <p className="mb-2"><i className="ri-phone-fill text-green-600 mr-2"></i>(+46) 73-613 00 70</p>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-4 text-black">OM SKOGSNALLEN</h4>
                    <Link to="/" className="block mb-2 hover:text-green-600">Hem</Link>
                    <Link to="/pages/about" className="block mb-2 hover:text-green-600">Om Oss</Link>
                    <Link to="/pages/careers" className="block mb-2 hover:text-green-600">Jobba med oss</Link>
                    <Link to="/pages/terms" className="block mb-2 hover:text-green-600">Villkor & Regler</Link>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-4 text-black">SUPPORT</h4>
                    <Link to="/pages/help" className="block mb-2 hover:text-green-600">Hjälp & Support</Link>
                    <Link to="/dashboard/orders" className="block mb-2 hover:text-green-600">Spåra din beställning</Link>
                </div>
            </footer>

            <div className="text-center text-sm text-gray-500 py-4 border-t">
                Upphovsrätt © 2025 av SkogsNallen. Alla rättigheter förbehållna.
            </div>
        </>
    );
};

export default Footer;

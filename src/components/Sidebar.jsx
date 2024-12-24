import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../redux/sidebarSlice';
import '../styles/Sidebar.css';
import { useState } from 'react';
import { Link } from "react-router-dom";


const Sidebar = () => {
    const isOpen = useSelector(state => state.sidebar.showSidebar);
    const dispatch = useDispatch();

    // Alt menülerin kontrolü için state
    const [activeMenu, setActiveMenu] = useState(null);

    const adjustSidebar = () => {
        dispatch(toggleSidebar(!isOpen));
    };

    // Alt menüyü açma/kapama
    const toggleSubMenu = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);  // Alt menüyü toggle et
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <button className="close-btn" onClick={adjustSidebar}>X</button>
                <h2>Menu</h2>
            </div>
            <div className="sidebar-content" >
                <ul>
                    <li className={`${activeMenu === 'discuss' ? 'activetab' : ''}`}>
                        <div className="menu-item" onClick={() => toggleSubMenu('discuss')}>
                            Discuss
                            <span className={`expand-icon ${activeMenu === 'discuss' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'discuss' && (
                            <ul className="submenu">
                                <a href="/news">
                                    <li href="/news">Forum</li> {/* Ya da React Router için <Link to="/news">Forum</Link> */}
                                </a>
                                <li>Topics</li>
                            </ul>
                        )}
                    </li>

                    <li onClick={() => toggleSubMenu('calendar')} className={`${activeMenu === 'calendar' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            Calendar
                            <span className={`expand-icon ${activeMenu === 'calendar' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'calendar' && (
                            <ul className="submenu">
                                <li>Events</li>
                                <li>Reminders</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => toggleSubMenu('search')} className={`${activeMenu === 'search' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            Global Search
                            <span className={`expand-icon ${activeMenu === 'search' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'search' && (
                            <ul className="submenu">
                                <li>By Name</li>
                                <li>By Date</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => toggleSubMenu('contacts')} className={`${activeMenu === 'contacts' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            Contacts
                            <span className={`expand-icon ${activeMenu === 'contacts' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'contacts' && (
                            <ul className="submenu">
                                <li>All Contacts</li>
                                <li>Favorites</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => toggleSubMenu('getPaid')} className={`${activeMenu === 'getPaid' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            Get Paid
                            <span className={`expand-icon ${activeMenu === 'getPaid' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'getPaid' && (
                            <ul className="submenu">
                                <li>Invoices</li>
                                <li>Payment Methods</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => toggleSubMenu('crm')} className={`${activeMenu === 'crm' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            CRM
                            <span className={`expand-icon ${activeMenu === 'crm' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'crm' && (
                            <ul className="submenu">
                                <li>Customer List</li>
                                <li>Sales Pipeline</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => toggleSubMenu('sales')} className={`${activeMenu === 'sales' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            Sales
                            <span className={`expand-icon ${activeMenu === 'sales' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'sales' && (
                            <ul className="submenu">
                                <li>Leads</li>
                                <li>Opportunities</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => toggleSubMenu('request')} className={`${activeMenu === 'request' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            Request
                            <span className={`expand-icon ${activeMenu === 'request' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'request' && (
                            <ul className="submenu">
                                <li>New Request</li>
                                <li>Pending Requests</li>
                            </ul>
                        )}
                    </li>

                    {/* Updated sections with only the first letter capitalized */}
                    <li onClick={() => toggleSubMenu('quotation')} className={`${activeMenu === 'quotation' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            Quotation
                            <span className={`expand-icon ${activeMenu === 'quotation' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'quotation' && (
                            <ul className="submenu">
                                <a href="/new-quotation">
                                    <li>New Quote</li>
                                </a>
                                <li>View Quotes</li>
                                <li>Quote History</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => toggleSubMenu('groups')} className={`${activeMenu === 'groups' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            Groups
                            <span className={`expand-icon ${activeMenu === 'groups' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'groups' && (
                            <ul className="submenu">
                                <li>Create Group</li>
                                <li>Manage Groups</li>
                                <li>Group Settings</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => toggleSubMenu('budget')} className={`${activeMenu === 'budget' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            Budget
                            <span className={`expand-icon ${activeMenu === 'budget' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'budget' && (
                            <ul className="submenu">
                                <li>Create Budget</li>
                                <li>View Budgets</li>
                                <li>Budget History</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => toggleSubMenu('reporting')} className={`${activeMenu === 'reporting' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            Reporting
                            <span className={`expand-icon ${activeMenu === 'reporting' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'reporting' && (
                            <ul className="submenu">
                                <li>Generate Report</li>
                                <li>View Reports</li>
                                <li>Download Reports</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => toggleSubMenu('invoicing')} className={`${activeMenu === 'invoicing' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            Invoicing
                            <span className={`expand-icon ${activeMenu === 'invoicing' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'invoicing' && (
                            <ul className="submenu">
                                <li>Create Invoice</li>
                                <li>View Invoices</li>
                                <li>Invoice History</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => toggleSubMenu('contracts')} className={`${activeMenu === 'contracts' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            Contracts
                            <span className={`expand-icon ${activeMenu === 'contracts' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'contracts' && (
                            <ul className="submenu">
                                <li>Create Contract</li>
                                <li>View Contracts</li>
                                <li>Contract Templates</li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;


import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../redux/sidebarSlice';
import '../styles/Sidebar.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'; // i18next'i import et

const Sidebar = () => {
    const { t } = useTranslation(); // useTranslation hook'unu kullanarak t fonksiyonunu alıyoruz
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
                            {t('discuss')}
                            <span className={`expand-icon ${activeMenu === 'discuss' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'discuss' && (
                            <ul className="submenu">
                                <a href="/news">
                                    <li href="/news">{t('forum')}</li> {/* Ya da React Router için <Link to="/news">Forum</Link> */}
                                </a>
                                <li>{t('topics')}</li>
                            </ul>
                        )}
                    </li>

                    <li onClick={() => toggleSubMenu('calendar')} className={`${activeMenu === 'calendar' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            {t('calendar')}
                            <span className={`expand-icon ${activeMenu === 'calendar' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'calendar' && (
                            <ul className="submenu">
                                <li>{t('events')}</li>
                                <li>{t('reminders')}</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => toggleSubMenu('search')} className={`${activeMenu === 'search' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            {t('globalSearch')}
                            <span className={`expand-icon ${activeMenu === 'search' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'search' && (
                            <ul className="submenu">
                                <li>{t('byName')}</li>
                                <li>{t('byDate')}</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => toggleSubMenu('contacts')} className={`${activeMenu === 'contacts' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            {t('contacts')}
                            <span className={`expand-icon ${activeMenu === 'contacts' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'contacts' && (
                            <ul className="submenu">
                                <li>{t('allContacts')}</li>
                                <li>{t('favorites')}</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => toggleSubMenu('getPaid')} className={`${activeMenu === 'getPaid' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            {t('getPaid')}

                            <span className={`expand-icon ${activeMenu === 'getPaid' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'getPaid' && (
                            <ul className="submenu">
                                <li>{t('invoices')}</li>
                                <li>{t('paymentMethods')}</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => toggleSubMenu('crm')} className={`${activeMenu === 'crm' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            {t('crm')}
                            <span className={`expand-icon ${activeMenu === 'crm' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'crm' && (
                            <ul className="submenu">
                                <li>{t('customerList')}</li>
                                <li>{t('salesPipeline')}</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => toggleSubMenu('sales')} className={`${activeMenu === 'sales' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            {t('sales')}
                            <span className={`expand-icon ${activeMenu === 'sales' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'sales' && (
                            <ul className="submenu">
                                <li>{t('leads')}</li>
                                <li>{t('opportunities')}</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => toggleSubMenu('request')} className={`${activeMenu === 'request' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            {t('request')}
                            <span className={`expand-icon ${activeMenu === 'request' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'request' && (
                            <ul className="submenu">
                                <li>{t('newRequest')}</li>
                                <li>{t('pendingRequests')}</li>
                            </ul>
                        )}
                    </li>

                    {/* Updated sections with only the first letter capitalized */}
                    <li onClick={() => toggleSubMenu('quotation')} className={`${activeMenu === 'quotation' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            {t('quotation')}
                            <span className={`expand-icon ${activeMenu === 'quotation' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'quotation' && (
                            <ul className="submenu">
                                <a href="/new-quotation">
                                    <li>{t('newQuote')}</li>
                                </a>
                                {/* <Link to="/new-quotation">

                                </Link> */}
                                <li>{t('viewQuotes')}</li>
                                <li>{t('quoteHistory')}</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => toggleSubMenu('groups')} className={`${activeMenu === 'groups' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            {t('groups')}
                            <span className={`expand-icon ${activeMenu === 'groups' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'groups' && (
                            <ul className="submenu">
                                <li>{t('createGroup')}</li>
                                <li>{t('manageGroups')}</li>
                                <li>{t('groupSettings')}</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => toggleSubMenu('budget')} className={`${activeMenu === 'budget' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            {t('budget')}
                            <span className={`expand-icon ${activeMenu === 'budget' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'budget' && (
                            <ul className="submenu">
                                <li>{t('createBudget')}</li>
                                <li>{t('viewBudgets')}</li>
                                <li>{t('budgetHistory')}</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => toggleSubMenu('reporting')} className={`${activeMenu === 'reporting' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            {t('reporting')}
                            <span className={`expand-icon ${activeMenu === 'reporting' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'reporting' && (
                            <ul className="submenu">
                                <li>{t('generateReport')}</li>
                                <li>{t('viewReports')}</li>
                                <li>{t('downloadReports')}</li>
                            </ul>
                        )}
                    </li>

                    <li onClick={() => toggleSubMenu('invoicing')} className={`${activeMenu === 'invoicing' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            {t('invoicing')}
                            <span className={`expand-icon ${activeMenu === 'invoicing' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'invoicing' && (
                            <ul className="submenu">
                                <li>{t('createInvoice')}</li>
                                <li>{t('viewInvoices')}</li>
                                <li>{t('invoiceHistory')}</li>
                            </ul>
                        )}
                    </li>

                    <li onClick={() => toggleSubMenu('contracts')} className={`${activeMenu === 'contracts' ? 'activetab' : ''}`}>
                        <div className="menu-item">
                            {t('contracts')}
                            <span className={`expand-icon ${activeMenu === 'contracts' ? 'expanded' : ''}`}>▶</span>
                        </div>
                        {activeMenu === 'contracts' && (
                            <ul className="submenu">
                                <li>{t('createContract')}</li>
                                <li>{t('viewContracts')}</li>
                                <li>{t('contractTemplates')}</li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;


import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { TabView, TabPanel } from 'primereact/tabview';
import { useDispatch } from "react-redux";
import { jwtDecode } from 'jwt-decode';
import { setCredentials } from "../features/auth/authSlice";
import { useRegisterMutation, useLoginMutation } from '../features/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { classNames } from 'primereact/utils';

const AuthForm = () => {
    const dispatch = useDispatch();
    const [registerFunc] = useRegisterMutation();
    const [loginFunc] = useLoginMutation();
    const toast = useRef(null);
    const navigate = useNavigate();


    const [registerData, setRegisterData] = useState({
        name: '', username: '', email: '', password: '', phone: ''
    });


    const [loginData, setLoginData] = useState({
        username: '', password: ''
    });


    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({ ...prev, [name]: value }));
    };


    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
    };


    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (!registerData.name || !registerData.username || !registerData.email || !registerData.password) {
            toast.current.show({ severity: 'warn', summary: 'שגיאה', detail: 'אנא מלא את כל השדות החובה', life: 3000 });
            return;
        }
        try {
            const response = await registerFunc(registerData).unwrap();
            toast.current.show({ severity: 'success', summary: 'נרשמת בהצלחה', detail: response.message, life: 3000 });
        } catch (err) {
            const msg = err?.data?.message || 'שגיאה בהרשמה';
            toast.current.show({ severity: 'error', summary: 'שגיאה', detail: msg, life: 3000 });
        }
    };


    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (!loginData.username || !loginData.password) {
            toast.current.show({ severity: 'warn', summary: 'שגיאה', detail: 'יש למלא שם משתמש וסיסמה', life: 3000 });
            return;
        }
        try {
            const response = await loginFunc(loginData).unwrap();
            const decodedUser = jwtDecode(response.accessToken);
            dispatch(setCredentials({ user: decodedUser, token: response.accessToken }));
            navigate("/home");
        } catch (err) {
            const msg = err?.data?.message || 'שגיאה בהתחברות';
            toast.current.show({ severity: 'error', summary: 'שגיאה', detail: msg, life: 3000 });
        }
    };


    const fieldStyle = { marginBottom: '1.5rem' };


    return (


        <div className="card" style={{ maxWidth: '480px', margin: 'auto', marginTop: '3rem', padding: '2rem' }}>
            <img src="/pictures/logo2.png" alt="Color Clay Logo" className="logo" />
            <div className="form-title">לכניסה לסטודיו שלנו</div>
            <Toast ref={toast} />
            <TabView>
                <TabPanel header="הרשמה">
                    <form onSubmit={handleRegisterSubmit} className="p-fluid">
                        <div className="field" style={fieldStyle}>
                            <span className="p-float-label">
                                <InputText id="name" name="name" value={registerData.name} onChange={handleRegisterChange} />
                                <label htmlFor="name">שם מלא*</label>
                            </span>
                        </div>
                        <div className="field" style={fieldStyle}>
                            <span className="p-float-label">
                                <InputText id="username" name="username" value={registerData.username} onChange={handleRegisterChange} />
                                <label htmlFor="username">שם משתמש*</label>
                            </span>
                        </div>
                        <div className="field" style={fieldStyle}>
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText id="email" name="email" type="email" value={registerData.email} onChange={handleRegisterChange} />
                                <label htmlFor="email">אימייל*</label>
                            </span>
                        </div>
                        <div className="field" style={fieldStyle}>
                            <span className="p-float-label">
                                <Password id="password" name="password" value={registerData.password} onChange={handleRegisterChange} toggleMask />
                                <label htmlFor="password">סיסמה*</label>
                            </span>
                        </div>
                        <div className="field" style={fieldStyle}>
                            <span className="p-float-label">
                                <InputText id="phone" name="phone" value={registerData.phone} onChange={handleRegisterChange} />
                                <label htmlFor="phone">טלפון (לא חובה)</label>
                            </span>
                        </div>
                        <Button type="submit" label="הרשם" className="p-button-success" />
                    </form>
                </TabPanel>


                <TabPanel header="כניסה">
                    <form onSubmit={handleLoginSubmit} className="p-fluid">
                        <div className="field" style={fieldStyle}>
                            <span className="p-float-label">
                                <InputText id="login-username" name="username" value={loginData.username} onChange={handleLoginChange} />
                                <label htmlFor="login-username">שם משתמש*</label>
                            </span>
                        </div>
                        <div className="field" style={fieldStyle}>
                            <span className="p-float-label">
                                <Password id="login-password" name="password" value={loginData.password} onChange={handleLoginChange} toggleMask />
                                <label htmlFor="login-password">סיסמה*</label>
                            </span>
                        </div>
                        <Button type="submit" label="התחבר" className="p-button-primary" />
                    </form>
                </TabPanel>
            </TabView>
        </div>
    );
};


export default AuthForm;





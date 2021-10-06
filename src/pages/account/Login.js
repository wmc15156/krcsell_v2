// @flow
import React, { useEffect } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, Redirect, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

//actions
import { resetAuth, loginUser } from '../../redux/actions';

import { useQuery } from '../../hooks/';

// components
import { VerticalForm, FormInput } from '../../components/';

import AccountLayout from './AccountLayout';

/* bottom link of account pages */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    {t("Don't have an account?")}{' '}
                    <Link to={'/account/register'} className="text-muted ms-1">
                        <b>{t('Sign Up')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const Login = (): React$Element<any> => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();

    const query = useQuery();
    const next = query.get('next');

    const { loading, userLoggedIn, user, error } = useSelector((state) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
    }));

    const schemaResolver = yupResolver(
        yup.object().shape({
            id: yup.string().required(t(`Please enter id`)),
            password: yup.string().required(t(`please enter Password`)),
        })
    );

    /*
    handle form submission
    */
    const onSubmit = (formData) => {
        dispatch(loginUser(formData['id'], formData['password']));
    };

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    return (
        <>
            {user ? <Redirect to={next ? next : '/dashboard/ecommerce'} /> : null}

            <AccountLayout bottomLinks={<BottomLink />}>
                {error && (
                    <Alert variant="danger" className="my-2">
                        {'아이디 및 비밀번호를 확인해주세요.'}
                    </Alert>
                )}

                <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
                    <FormInput
                        label={t('id')}
                        type="text"
                        name="id"
                        placeholder={t('Enter your id')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('password')}
                        type="password"
                        name="password"
                        placeholder={t('Enter your password')}
                        containerClass={'mb-3'}>
                        {/*<Link to="/account/forget-password" className="text-muted float-end">*/}
                        {/*    <small>{t('Forgot your password?')}</small>*/}
                        {/*</Link>*/}
                    </FormInput>

                    <div className="mb-3 mb-0 text-center">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {t('Log In')}
                        </Button>
                    </div>
                </VerticalForm>
            </AccountLayout>
        </>
    );
};

export default Login;

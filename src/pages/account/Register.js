// @flow
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//actions
import { resetAuth, signupUser } from '../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../components/';

import AccountLayout from './AccountLayout';
import { BANKNAME } from '../../constants/bankname';

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    {t('Already have account?')}{' '}
                    <Link to={'/account/login'} className="text-muted ms-1">
                        <b>{t('Log In')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const Register = (): React$Element<React$FragmentType> => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { loading, userSignUp, error } = useSelector((state) => ({
        loading: state.Auth.loading,
        error: state.Auth.registerError,
        userSignUp: state.Auth.userSignUp,
    }));

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('Please enter name')),
            id: yup
                .string()
                .required('Please enter id')
                .matches(
                    /^(?=[a-z0-9_]{0,100}$)(?![a-z0-9]{100})[^_]*_?[^_]*$/,
                    '아이디 형식은 소문자 및 특수문자 _ 만 입력가능합니다.'
                ),
            password: yup
                .string()
                .required(t('Please enter Password'))
                .matches(
                    /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                    '비밀번호 길이는 6자리 이상이며, 숫자 및 특수문자(#?!@$%^&*-)를 포함해야 됩니다.'
                ),
            passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'password is not match'),
            bank: yup.string().required('Please enter bank name'),
            contact: yup.string().required('Please enter phone number'),
            banknum: yup.string().required('Please enter account'),
        })
    );

    const BankNameOption = () => {
        return BANKNAME.map((bank, i) => {
            return (
                <option value={bank} key={bank}>
                    {bank}{' '}
                </option>
            );
        });
    };

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        console.log(formData);
        const { id, password, name, bank, banknum, contact, telegram } = formData;
        dispatch(signupUser(id, password, name, bank, banknum, contact, telegram));
    };

    const successSignUp = () => {
        alert('정상적으로 가입이 완료되었습니다. \n 로그인 페이지로 이동합니다.');
        return <Redirect to={'/account/login'} />;
    };

    return (
        <>
            <AccountLayout bottomLinks={<BottomLink />}>
                {/*<div className="text-center w-75 m-auto">*/}
                {/*    <h4 className="text-dark-50 text-center mt-0 fw-bold">{t('Free Sign Up')}</h4>*/}
                {/*    <p className="text-muted mb-4">*/}
                {/*        {t("Don't have an account? Create your account, it takes less than a minute.")}*/}
                {/*    </p>*/}
                {/*</div>*/}
                {userSignUp ? successSignUp() : null}

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
                    <FormInput
                        label={t('이메일 주소')}
                        type="text"
                        name="id"
                        placeholder={t('Enter your email')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('패스워드')}
                        type="password"
                        name="password"
                        placeholder={t('Enter your password')}
                        containerClass={'mb-3'}
                    />

                    <FormInput
                        label={t('패스워드 확인')}
                        type="password"
                        name="passwordConfirm"
                        placeholder={t('Enter your password confirm')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('이름(예금주)')}
                        type="text"
                        name="name"
                        placeholder={t('Enter your name')}
                        containerClass={'mb-3'}
                    />

                    <FormInput
                        label={
                            <p>
                                은행명 <br />
                                (기존에 입력하신 애용과 동일한 계좌와 은행으로 신청해주세요. 내용이 다를겨우 구매가
                                이루어지지 않습니다.
                                <br />
                                또한{' '}
                                <strong style={{ color: '#ff6838' }}>
                                    {' '}
                                    토스, 카카오페이 등 송금 어플 등록이 불가{' '}
                                </strong>
                                합니다.)
                            </p>
                        }
                        type="select"
                        name="bank"
                        containerClass={'mb-3'}>
                        {BankNameOption()}
                    </FormInput>

                    <FormInput
                        label={t('계좌번호')}
                        type="text"
                        name="banknum"
                        placeholder={t('Enter your account')}
                        containerClass={'mb-3'}
                    />

                    <FormInput
                        label={t('휴대폰 번호')}
                        type="text"
                        name="contact"
                        placeholder={t('Enter your phoneNumber')}
                        containerClass={'mb-3'}
                    />

                    <FormInput
                        label={
                            <p>
                                텔레그램 아이디 <br />
                                (코인구매등 진행 정보 및 결과를 텔레그램으로 받기를 원하시면 본인 소유 텔레그램 아이디를
                                입력해주세요. 필수아님
                            </p>
                        }
                        type="text"
                        name="telegram"
                        placeholder={t('Enter your telegram')}
                        containerClass={'mb-3'}
                    />

                    {/*<FormInput*/}
                    {/*    label={t('I accept Terms and Conditions')}*/}
                    {/*    type="checkbox"*/}
                    {/*    name="checkboxsignup"*/}
                    {/*    containerClass={'mb-3 text-muted'}*/}
                    {/*/>*/}

                    <div className="mb-3 mb-0 text-center">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {t('Sign Up')}
                        </Button>
                    </div>
                </VerticalForm>
            </AccountLayout>
        </>
    );
};

export default Register;

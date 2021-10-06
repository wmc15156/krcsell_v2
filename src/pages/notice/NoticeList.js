import PageTitle from '../../components/PageTitle';
import React, { useEffect } from 'react';
import { getAllNotice } from '../../service/Notice';
import { useState } from 'react';
import { Card, Col, Row, Modal, Button } from 'react-bootstrap';
import Table from '../../components/Table';
import { products } from '../apps/Ecommerce/Data';
import { ActionColumn, ProductColumn, StatusColumn } from '../apps/Ecommerce/Products';
import moment from 'moment';
import { useRecoilValue } from 'recoil';
import { AccountInfoAtom } from '../../recoil/atoms';
import { Link } from 'react-router-dom';

const NoticeListPage = () => {
    const [notices, setNotices] = useState([]);
    const [selectNotice, setSelectNotice] = useState([]);
    const accountInfo = useRecoilValue(AccountInfoAtom);
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const toggle = () => {
        setModal(!modal);
    };

    const openModalWithSize = (size) => {
        setSize(size);
        toggle();
    };

    const NoticeColumn = ({ row: { cells } }) => {
        return (
            <React.Fragment>
                <p className="m-0 d-inline-block align-middle font-16">
                    <span
                        onClick={() => {
                            console.log(cells[0].value, notices);
                            const filteredNotice = notices.filter((n) => n.title === cells[0].value);
                            console.log(filteredNotice, 'here22');
                            setSelectNotice(filteredNotice);
                            openModalWithSize('lg');
                        }}
                        style={{ cursor: 'pointer' }}>
                        {cells[0].value}
                    </span>
                    <br />
                </p>
            </React.Fragment>
        );
    };

    const columns = React.useMemo(
        () => [
            {
                Header: '제목',
                accessor: 'title',
                // sort: true,
                Cell: NoticeColumn,
            },
            {
                Header: '작성자',
                accessor: 'user',
            },
            {
                Header: '일시',
                accessor: 'timestamp',
                // Cell: (data) => <span>{data}</span>,
            },
        ],
        [JSON.stringify(notices)]
    );

    const sizePerPageList = [
        {
            text: '5',
            value: 5,
        },
        {
            text: '10',
            value: 10,
        },
        {
            text: '20',
            value: 20,
        },
        {
            text: 'All',
            value: products.length,
        },
    ];

    const modalHandler = () => {
        console.log('click');
        openModalWithSize('lg');
    };

    useEffect(() => {
        bootstrap();
    }, []);

    const bootstrap = async () => {
        let data = await getAllNotice(0);
        data = data.map((d) => ({
            title: d.title,
            timestamp: moment(d.timestamp).format('YYYY-MM-DD'),
            user: d.user.name,
            message: d.message,
        }));
        setNotices(data);
    };

    return (
        <>
            <PageTitle
                breadCrumbItems={[{ label: '공지사항', path: '/notice/list', active: true }]}
                title={'공지사항'}
            />

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Table
                                columns={columns}
                                data={notices}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={false}
                                pagination={true}
                                isSearchable={false}
                                theadClass="table-light"
                                searchBoxClass="mt-2 mb-3"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <div>
                <h3>KRC Token 판매 / 구매 안내</h3>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <div>- 서비스는 암호자산으로 충전 운영됩니다. </div>
                                <div>
                                    {' '}
                                    - 판매/충전금 확인 아이디는 아래에 있으며, 비밀번호는 현재 접속 비밀번호와
                                    동일합니다.
                                </div>
                                <div>
                                    {' '}
                                    - 각 블록의 Confirmation 과정에 따라 구매 이후 충전금 반영까지 다소 시간이 지연될 수
                                    있습니다.
                                </div>
                                <div> - 구매 및 충전 완료시 아래 버튼을 통해 보유 암호자산을 조회할 수 있습니다.</div>
                                <div>
                                    {' '}
                                    - 판매를 위해서는 추가 승인이 필요합니다. 승인된 판매자만 KRC Token을 판매할 수
                                    있습니다.
                                </div>
                                <div>
                                    {' '}
                                    - KRC BUY는 판매자와 구매자를 중개해주는 역할만 수행할 뿐, 암호자산을 직접
                                    구매/판매하지 않습니다.
                                </div>
                                <div>
                                    {' '}
                                    - 거래시 일어나는 각종 사고에 대한 책임은 판매자와 구매자에게 있습니다. 플랫폼은
                                    거래를 중개하는 역할만 수행합니다.
                                </div>
                                <br />
                                <div>
                                    판매/충전금 확인 아이디: <strong>{accountInfo.name}</strong>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                    <Modal.Header onHide={toggle} closeButton>
                        <h4 className="modal-title">{selectNotice.length && selectNotice[0].title}</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <p dangerouslySetInnerHTML={{ __html: selectNotice.length && selectNotice[0].message }} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={toggle}>
                            확인
                        </Button>{' '}
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default NoticeListPage;

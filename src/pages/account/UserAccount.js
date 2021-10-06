import styled from 'styled-components';

const UserContainer = styled.div`
    .account-header {
        margin-top: 50px;
    }
`;

const UserAccountPage = () => {
    return (
        <UserContainer>
            <div className="account-header">
                <h3>회원 계정</h3>
            </div>
        </UserContainer>
    );
};

export default UserAccountPage;

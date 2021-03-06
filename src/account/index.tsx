/// <reference path="../redux/types.d.ts" />
/// <reference path="../redux/account/types.d.ts" />
import * as React from 'react';
import { Card } from 'antd';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import 'particles.js';
import * as cx from 'classnames';
import particlesConfig from '../config/particles';
import { RootState } from '../redux/types';
import { InjectedRouter } from 'react-router';

interface Props {
    children: React.ReactNode;
    location: {
        pathname: string;
    };
    dispatch: Dispatch<() => {}>;
    account: StateAccountTypes;
    profile: StateProfileTypes;
    router: InjectedRouter;
}

class AccountLayout extends React.Component <Props, {}> {

    componentWillMount() {
        const { profile, router} = this.props;
        if (profile.currentUser) {
            router.replace('/');
        }
    }

    componentDidMount() {
        // tslint:disable
        window['particlesJS']('particles-js', particlesConfig)
    }

    render() {
        const {children, location: {pathname}, dispatch, account} = this.props;
        const isLoginRoute = pathname.includes('login')
        const isRegisterRoute = pathname.includes('register')
        return (
            <div className={cx('account-Layout', {'account-Layout--register': isRegisterRoute})} id="particles-js">
                <Card className={cx({'account-LoginCard': isLoginRoute, 'account-RegisterCard': isRegisterRoute})}>
                    <div className="account-CardTitle">
                        {isRegisterRoute && '注册'}
                        {isLoginRoute && '登录'}
                    </div>
                    {React.cloneElement(children as React.ReactElement<any>, {
                        dispatch,
                        ...(isLoginRoute && {status: account.loginStatus}),
                        ...(isRegisterRoute && {status: account.registerStatus})
                    })}
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        account: state.account,
        profile: state.profile,
    };
};

export default connect(mapStateToProps)(AccountLayout)

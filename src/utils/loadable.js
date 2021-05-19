import React from 'react';
import Loadable from 'react-loadable';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//通用的过场组件
class loadingComponent extends React.Component{
    constructor(props) {
        super(props)
        NProgress.start()
    }
    componentDidMount() {
        NProgress.done()
    }
    render() {
        return <div />
    }
}

//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (loader,loading = loadingComponent)=>{
    return Loadable({
        loader,
        loading
    });
} 
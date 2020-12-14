import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'antd';
import { TitleBar, Content } from '../../components';
import Table from './components/Table';
import { RESET } from './redux/constants';
const { Panel } = Collapse;
class Home extends Component {
  componentWillUnmount() {
    this.props.dispatch({ type: RESET });
  }
  callback(key) {
    console.log(key);
  }
  render() {

    return (
      <Content>
        <TitleBar title='HOME WITH REALTIME CHART' />
        <Collapse defaultActiveKey={['1']} onChange={this.callback}>
          <Panel header="ORDER BOOK BTC/USD" key="1">
            <div className={"masterContainer"}>
              <Table data={this.props.table} flagGraph={true} />
              <Table data={this.props.table} flagGraph={false} />
            </div>
          </Panel>
          <Panel header="ORDER HISTORY" key="2">
            <div className={"masterContainer"}>
              comming soon
            </div>
          </Panel>
          <Panel header="POSITIONS" key="3">
            <div className={"masterContainer"}>
              comming soon
            </div>
          </Panel>
          <Panel header="ORDER" key="4">
            <div className={"masterContainer"}>
              comming soon
            </div>
          </Panel>
        </Collapse>
      </Content>
    );
  }
}




export default connect(state => state.home)(Home);

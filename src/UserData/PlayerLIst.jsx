import React, { Component } from 'react';
import axios from 'axios'
import { Card, Col, Row } from 'antd';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

class PlayerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            input: "",
            isLoder: true,
        }
    }
    componentDidMount() {
        this.getList();
    }
    getList = async (e) => {
        let res = await axios.get('https://api.npoint.io/20c1afef1661881ddc9c')
            .then((response) => {
                console.log(response)
                this.setState({
                    list: response.data.playerList,
                    isLoder: false
                })
            })
            .catch((error) => console.error(error))
    }
    displayList() {
        let playerList = this.state.list
        playerList.sort(function (a, b) { return a.Value - b.Value });
        const { Meta } = Card;
        if (this.state.list.length > 0) {
            return (playerList).filter(d => this.state.input == '' || d.PFName.toLowerCase().includes(this.state.input)).map((data, indx) => {
                console.log(data.UpComingMatchesList[0].CCode)
                return (
                    <Col span={4}>
                        <Card
                            hoverable
                            
                            cover={<img src={`/player-images/${data.Id}.jpg`} alt={data.PFName} />}
                        >
                            <Meta title={data.PFName} description={data.SkillDesc} />
                            <p className="align-right">${data.Value}</p>

                            <div className="upcmg-match">
                                <p className="upcmg-heading">Upcoming match</p>
                                <p className="upcmg-details">
                                    {
                                        data.UpComingMatchesList[0].MDate != ""
                                            ? <> <p >{data.UpComingMatchesList[0].CCode} vs {data.UpComingMatchesList[0].VsCCode}</p>
                                                <p>{data.UpComingMatchesList[0].MDate}</p></>
                                            : <p>No upcoming match</p>
                                    }

                                </p>

                            </div>

                        </Card>,
                    </Col >
                )

            })

        }

    }
    handleChange = (e) => {
        this.setState({
            input: e.target.value
        })
        this.displayList()

    }
    render() {
        return (
            <>
                <div className="container">
                    <input type="text" onChange={this.handleChange} className="input" placeholder="Search player"/>
                    <hr />
                    <Row gutter={15}>
                        {this.displayList()}
                    </Row>

                </div>
                {
                    this.state.isLoder == true

                        ? <div className="spinner"> <LoadingOutlined style={{ fontSize: 24 }} spin size="large" /></div>
                        : null
                }


            </>
        );
    }
}

export default PlayerList;
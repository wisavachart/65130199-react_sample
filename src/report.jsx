import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Common from "./common";
import Image from "react-bootstrap/Image";

const BASE_URL = Common.API_URL;

export default class report extends Component {
  state = {
    zipcode: 10210,
    amphur_code: 0,
    amphur_name: "",
    province_code: 0,
    province_name: "",
    district: [],
  };
  getData = async () => {
    if (this.state.zipcode.length < 5) {
      return false;
    }
    try {
      await axios
        .get(`${BASE_URL}/${this.state.zipcode}`)
        .then((response) => {
          let res = response.data;

          if (res.district === undefined) {
            this.setState({
              district: [],
            });
          }
          this.setState({
            amphur_name: res.amphur_name,
            province_name: res.province_name,
            district: res.district,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  filter = (e) => {
    this.setState({
      zipcode: e.target.value,
    });
    this.getData();
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    const { district } = this.state;
    return (
      <div>
        <Navbar variant="dark" style={{
          margin: "20px",
          background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
          borderRadius: "10px",
          border: "2px solid black"

        }}>
          <Container>
            <Navbar.Brand href="#" style={{
              color: "white",
              fontWeight: "bold"
            }}>ค้นหาเลขไปรษณีย์</Navbar.Brand>
            <div style={{
              display: "flex",
              alignItems: "center"
            }}>
              <Image src="https://scontent.fbkk15-1.fna.fbcdn.net/v/t39.30808-6/285816824_5422896877731311_1709474184930319498_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=174925&_nc_eui2=AeEgdXJC43JOvWLhsrBfsJ6MtE7Qs0eT_c-0TtCzR5P9z3EJW1LGuhEYXYqGe2l7mndvH-6448lFB_2Ml-MnPogm&_nc_ohc=SNH-6_ULDhkAX9Zjdqe&_nc_ht=scontent.fbkk15-1.fna&oh=00_AfDimAz-CaOc9--9-0H0IEfqq8RRoZYKdYm1UgC5EYXVVw&oe=63F4DFC6" roundedCircle thumbnail style={{
                marginRight: "20px",
                width: "100px",
                height: "100px"
              }}></Image>
              <div style={{
                color: "white",
                fontWeight: "bold"
              }}>นายวิศวชาติ สินธุวณิก รหัสนักศึกษา 65130199</div></div>
          </Container>
        </Navbar>
        <Container>
          <div style={{ paddingTop: "50px" }}>
            <Row>
              <Col lg="9">
                <div align="left">
                  <h3>
                    อำเภอ <u>{this.state.amphur_name}</u> จังหวัด{" "}
                    <u>
                      {this.state.province_name} {this.state.zipcode}
                    </u>
                  </h3>
                </div>
              </Col>
              <Col lg="3">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="ระบุเลขไปรษณีย์ 5 หลัก"
                    onChange={this.filter}
                    onKeyUp={this.filter}
                    maxLength="5"
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div style={{ paddingTop: "15px" }}>
            <Card>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>รหัสตำบล</th>
                      <th>ตำบล</th>
                    </tr>
                  </thead>
                  <tbody>
                    {district?.map((rs, index) => (
                      <tr key={index}>
                        <td align="center">{index + 1}</td>
                        <td>{rs.district_code}</td>
                        <td>{rs.district_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
    );
  }
}

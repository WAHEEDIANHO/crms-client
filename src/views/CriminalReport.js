import React from "react";
import axios from "axios";

import Report from "../components/Report";
import Loader from "../components/Loader";
import Error from "../components/Error";

import Guide from "../components/Guide";

class CriminalReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = { criminals: [], loading: false };

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const fetctCriminal = async () => {
      try {
        const res = await this.getCriminal();
        this.setState({ criminals: [...this.state.criminals, ...res.data] });
      } catch (err) {
        this.setState({ loading: false });
      }
    };
    fetctCriminal();
  }

  // fetch data
  getCriminal = async () => {
    const config = {
      headers: {
        authorization: `bearer ${sessionStorage.getItem("token")}`,
      },
    };
    // "https://crms-api.herokuapp.com/api/v1/criminal",
    const res = await axios.get(`${this.props.api}/criminal`, config);
    return res.data;
  };

  handleDelete(e) {
    const { id } = e.target.dataset;
    this.setState({ loading: true });
    axios
      .delete(`${this.props.api}/criminal/${id}`, {
        headers: {
          authorization: `bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res.id);
        this.setState({
          criminals: this.state.criminals.filter(
            (criminal) => criminal._id !== res.id
          ),
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  }

  renderReport = () => (
    <table className="table align-middle mb-0 bg-white">
      <thead className="bg-light">
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Crime</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {this.state.criminals.length !== 0 ? (
          this.state.criminals.map((criminal, i) => (
            <Report
              data={criminal}
              key={i}
              pre="criminal"
              api={this.props.api}
              handleDelete={this.handleDelete}
            />
          ))
        ) : (
          <tr>
            <td colSpan={5}>
              <Error />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  render() {
    return (
      <>
        {this.state.loading ? <Loader /> : null}
        <Guide>
          <h3>
            Criminals Report from <strong>CRMS</strong>
          </h3>
          <p className="mb-4">Crime Managemen System</p>
        </Guide>
        <div className="container">{this.renderReport()}</div>
      </>
    );
  }
}

export default CriminalReport;
// <Report />

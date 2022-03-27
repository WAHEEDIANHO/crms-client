import React from "react";
import axios from "axios";
import Criminal from "./Criminal";

class Criminals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      criminals: [],
    };
  }

  componentDidMount() {
    const fetctCriminal = async () => {
      const res = await this.getCriminal();
      this.setState({ criminals: [...this.state.criminals, ...res.data] });
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

    const res = await axios.get(
      "https://crms-api.herokuapp.com/api/v1/criminal",
      config
    );
    return res.data;
  };

  filterCriminals(isFilter) {
    return this.state.criminals.map((criminal) => {
      if (isFilter)
        return (
          criminal.type === "wanted" && (
            <Criminal key={criminal._id} criminal={criminal} />
          )
        );
      else return <Criminal key={criminal._id} criminal={criminal} />;
    });
  }

  render() {
    return (
      <div className="container criminals" style={{ marginTop: "80px" }}>
        <h2 className="text-center">{this.props.title}</h2>
        {this.filterCriminals(this.props.filter)}
      </div>
    );
  }
}

export default Criminals;

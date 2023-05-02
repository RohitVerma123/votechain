import rohitcontract from "/Users/rohitverma/votechain/client/src/contracts/rohitcontract.json";
import React , {Component} from 'react';
import getWeb3 from "./getweb3";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rohitinstance: undefined,
      account: null,
      web3: null,
      isOwner: false,
      start: null,
      end: null,
    };
  }

  async componentDidMount() {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = rohitcontract.networks[networkId];
      const instance = new web3.eth.Contract
      (
        rohitcontract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({
        rohitinstance: instance,
        web3: web3,
        account: accounts[0],
      });

      // get owner from smart contract and set isOwner state
      const owner = await this.state.rohitinstance.methods.getOwner().call();
      if (this.state.account === owner) {
        this.setState({ isOwner: true });
      }

      // get start and end from MasoomInstance (typo?) smart contract and set start and end states
      let start = await this.state.rohitinstance.methods.getStart().call();
      let end = await this.state.rohitinstance.methods.getEnd().call();
      this.setState({ start: start, end: end });
    } catch (error) {
      // handle error by setting error state
      this.setState({ error: "Failed to load" });
      console.error(error);
    }
  }

  render() {
    if (this.state.error) {
      return <div>{this.state.error}</div>;
    }

    if (!this.state.web3) {
      return <div>Loading Page</div>;
    } else {
      return (
        <div>
          Hello Rohit
          VoteChain is Working Fine
        </div>
      );
    }
  }
}

export default Home;

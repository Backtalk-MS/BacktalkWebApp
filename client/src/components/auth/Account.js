import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
//import {Tabs, Tablist} from 'Tabs';
import Tabs from './Tabs';


class Account extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            errors: {}
        };
    }

    
    render() {
        const errors = this.state.errors;
        return (
            <div>
                const Root = () => (
                <div className="ui container">

                <Tabs.Tabs selected={ 1 }>
                    <Tabs.TabList>
                        <Tabs.Tab>
                            <Tabs.Button>Foo</Tabs.Button>
                        </Tabs.Tab>
                        <Tabs.Tab>
                            <Tabs.Button>Bar</Tabs.Button>
                        </Tabs.Tab>
                        <Tabs.Tab>
                            <Tabs.Button>Baz</Tabs.Button>
                        </Tabs.Tab>
                    </Tabs.TabList>

                    <Tabs.TabPanel>
                        Related to foo
                    </Tabs.TabPanel>

                    <Tabs.TabPanel>
                        Related to bar
                    </Tabs.TabPanel>

                    <Tabs.TabPanel>
                        Related to baz
                    </Tabs.TabPanel>
                </Tabs.Tabs>

                    <p>
                        This is the account page. HELLOOOOOO!?
                    </p>
                    
                </div>
                )
            </div>
        );
    }  
}

export default Account;
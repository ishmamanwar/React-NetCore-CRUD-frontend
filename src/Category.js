import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddCatModal} from './AddCatModal';

export class Category extends Component {


    constructor(props){
        super(props);
        this.state={cats:[], addModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'category')
        
        .then(response=>response.json())
        .then(data=>{
            this.setState({cats:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    render(){
        const {cats} = this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>CategoryId</th>
                            <th>CategoryName</th>
                            <th>Active/Inactive</th>
                            <th>CategoryDescription</th>
                            <th>Options</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {cats.map(cat =>
                            <tr key={cat.CategoryId}>
                                <td>{cat.CategoryId}</td>
                                <td>{cat.CategoryName}</td>
                                <td>{(() => {
                                    if (cat.Active === 1) {
                                        return (
                                        <Button disabled type="checkbox">Active</Button>
                                    )
                                    } else if (cat.Active === 0) {
                                        return (
                                            <Button disabled type="checkbox" variant="secondary" >Inactive</Button>
                                    )
                                }
                                })()}
                                </td>
                                <td>{cat.CategoryDescription}</td>
                                <td>Edit / Delete </td>
                            </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Category
                    </Button>

                    <AddCatModal show={this.state.addModalShow}
                    onHide={addModalClose}></AddCatModal>
                </ButtonToolbar>
            </div>
        )
    }
}
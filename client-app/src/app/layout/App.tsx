import React , {useEffect,Fragment, useContext} from 'react';
import { Container} from 'semantic-ui-react'
import { NavBar } from '../../features/nav/NavBar';
import  ActivityDashboard from '../../features/Activities/ActivityDashboard';
import { LoadingComponent } from './LoadingComponent';
import  ActivityStore from '../stores/activityStore';
import {observer} from 'mobx-react-lite';

const App = () => {
const activityStore = useContext(ActivityStore)

useEffect(()=>{
  activityStore.loadActivities();
},[activityStore]);


if(activityStore.loadingInitial) return <LoadingComponent content='Loading Activites...'></LoadingComponent>

    return (
      <Fragment>
       <NavBar></NavBar>
          <Container style={{marginTop:'7em'}}>
         <ActivityDashboard></ActivityDashboard>
          </Container>
       </Fragment>
      
    );
 
}

export default observer(App);

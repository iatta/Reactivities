import React , {useState,useEffect,Fragment, SyntheticEvent} from 'react';
import { Container} from 'semantic-ui-react'
import { IActivity } from '../models/activity';
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/Activities/ActivityDashboard';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';


interface IState{
  activities : IActivity[]
}
const App = () => {
const [activities, setActivities] = useState<IActivity[]>([])
const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null)
const [editMode , setEditMode] = useState(false);
const[loading,setLoading]  =  useState(true);
const[submitting , setSubmitting] = useState(false);
const [target, setTarget] = useState('');



const handleSelectActivity = (id:string) => {
  setSelectedActivity(activities.filter(a => a.id === id)[0])
  setEditMode(false);
}

const handleOpenCreateForm = () =>{
  setSelectedActivity(null);
  setEditMode(true);
}

const handelCreateActivity = (activity : IActivity) => {
  setSubmitting(true);
  agent.Activities.create(activity).then(()=>{
    setActivities([...activities ,activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }).then(() => setSubmitting(false));
 
}
const handelEditActivity = (activity : IActivity) => {
  setSubmitting(true);
  agent.Activities.update(activity.id,activity).then(()=>{
    setActivities([...activities.filter(a => a.id !== activity.id) ,activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }).then(() => setSubmitting(false));

}
const handleDeleteActivity =  (event : SyntheticEvent<HTMLButtonElement>,id : string) => {
  setSubmitting(true);
  setTarget(event.currentTarget.name);
  agent.Activities.delete(id).then(() => {
    setActivities([...activities.filter(a => a.id !== id)]);
  }).then(() => setSubmitting(false));
  
}

useEffect(()=>{
  agent.Activities.list()
    .then((response) => {
      let activities : IActivity[] =[] ;
      response.forEach(activity => {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      })
      setActivities(activities)
    }).then(() => {
      setLoading(false);
    });
},[]);

if(loading) return <LoadingComponent content='Loading Activites...'></LoadingComponent>

    return (
      <Fragment>
       <NavBar openCreateForm={handleOpenCreateForm}></NavBar>
          <Container style={{marginTop:'7em'}}>
         <ActivityDashboard 
            activities={activities} 
            selectActivity={handleSelectActivity} 
            selectedActivity={selectedActivity!}
            editMode = {editMode}
            setEditMode = {setEditMode}
            setSelectedActivity={setSelectedActivity}
            createActivity = {handelCreateActivity}
            editActivity = {handelEditActivity}
            deleteActivity = {handleDeleteActivity }
            submitting = {submitting}
            target = {target}
            >
            
         </ActivityDashboard>
          </Container>
       </Fragment>
      
    );
 
}

export default App;

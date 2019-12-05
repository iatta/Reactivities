
//rafc
import React from 'react'
import { Grid } from 'semantic-ui-react'
import { IActivity } from '../../app/models/activity'
import { ActivityList } from './ActivityList'
import { ActivityDetail } from './ActivityDetail'
import { ActivityForm } from './form/ActivityForm'

interface  IProp{
    activities : IActivity[];
    selectActivity: (id:string) =>void;
    selectedActivity : IActivity;
    editMode : boolean;
    setEditMode :(editMode : boolean) => void;
    setSelectedActivity : (activity : IActivity | null) => void;
    createActivity : (activity : IActivity ) => void;
    editActivity : (activity : IActivity ) => void;
    deleteActivity : (id : string ) => void;
}

export const ActivityDashboard: React.FC<IProp> = ({activities , selectActivity ,selectedActivity,editMode ,setEditMode,setSelectedActivity,createActivity,editActivity,deleteActivity}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
            <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity = {deleteActivity}> </ActivityList>
            </Grid.Column>
            <Grid.Column width={6}>
            {selectedActivity && !editMode && 
                <ActivityDetail 
                activity={selectedActivity} 
                setEditMode={setEditMode} 
                setSelectedActivity={setSelectedActivity}>
                </ActivityDetail>}
            {editMode && <ActivityForm key={selectedActivity && (selectedActivity.id || 0)}
                setEditMode={setEditMode}  
                activity={selectedActivity} 
                createActivity={createActivity} 
                editActivity={editActivity}> </ActivityForm>}
            </Grid.Column>
        </Grid>
    )
}

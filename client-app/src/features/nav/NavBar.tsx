import React, { useContext } from 'react'
import { Menu,Container,Button } from 'semantic-ui-react'
import ActivityStore from '../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';


export const NavBar : React.FC = () => {
    const activityStroe = useContext(ActivityStore);

    return (
        <Menu fixed='top' inverted>
        <Container>
            <Menu.Item>
                <img src="/assets/logo.png" alt="" style={{marginRight:'10px'}}/>
                Reactivities
            </Menu.Item>
            <Menu.Item name='Activities'/>
            <Menu.Item>
            <Button onClick={activityStroe.openCreateForm} positive content='Creat Activity'></Button>
            </Menu.Item>
        </Container>
       
      </Menu>
    )
}

export default observer(NavBar)
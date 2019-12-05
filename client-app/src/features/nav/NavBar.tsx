import React from 'react'
import { Menu,Container,Button } from 'semantic-ui-react'

interface IProps{
    openCreateForm : () => void;
}

export const NavBar : React.FC<IProps> = ({openCreateForm}) => {
    return (
        <Menu fixed='top' inverted>
        <Container>
            <Menu.Item>
                <img src="/assets/logo.png" alt="" style={{marginRight:'10px'}}/>
                Reactivities
            </Menu.Item>
            <Menu.Item name='Activities'/>
            <Menu.Item>
            <Button onClick={openCreateForm} positive content='Creat Activity'></Button>
            </Menu.Item>
        </Container>
       
      </Menu>
    )
}

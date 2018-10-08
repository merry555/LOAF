import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView
} from "react-native";

import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'

class ProjectBoardList extends Component {

    render() {
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}} />
                        <Body>
                            <Text>Varun </Text>
                            <Text note>Jan 15, 2018</Text>
                        </Body>
                    </Left>
                </CardItem> 
                <CardItem>
                    <Body style={{ alignItems: 'center'}}>
                        <Text>
                            <Text style={{ fontWeight: "900" }}>Loaf 회의록
                            </Text>
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}
export default ProjectBoardList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
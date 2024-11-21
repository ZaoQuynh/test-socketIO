import React from "react";
import "./Narbar.css";
import NotificationIcon from "../../assets/notification.svg";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: []
        };

        this.displayNotification = this.displayNotification.bind(this);
    }

    componentDidMount() {
        const {socket} = this.props;    
        socket.on("getNotification", (data) => {
            this.setState(prev => {   
                const { senderName, type } = data;
                let newNotifications;
                if (type === 0) {
                    newNotifications = prev.notifications.filter(notification => 
                        !(notification.senderName === senderName && notification.type === 1)
                    );
                } else {
                    newNotifications = [...prev.notifications, data];
                    console.log(newNotifications); 
                }
                return { notifications: newNotifications };
            })
        });
    }

    displayNotification(senderName, type) {
        let action;

        if(type === 1){
            action = "liked";
        } else if (type === 2){
            action = "commented";
        } else {
            action = "shared";
        }

        return (
            <span className="notification">{senderName} {action} your post</span>
        )
    }

    componentWillUnmount() {
        const { socket } = this.props;    
        socket.off("getNotification"); 
    }

    render() {
        return (
            <div className="navbar">
                <span className="logo">Notification Realtime Example</span>
                <div className="icon notification-btn">
                    <img className="iconImg" src={NotificationIcon} alt="notification"/>
                    <div className="counter">{this.state.notifications.length}</div>
                </div>
                <div className="notifications">
                {this.state.notifications.length === 0 ? (
                        <span className="notification">Không có thông báo</span>
                    ) : (
                        this.state.notifications.map((notification) => (
                            this.displayNotification(notification.senderName, notification.type)
                        ))
                    )}
                </div>
            </div>
        );
    }
}

export default Navbar;
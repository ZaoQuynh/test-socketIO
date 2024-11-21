import React from "react";
import "./Card.css";
import HeartIcon from "../../assets/heart.svg";
import HeartFilteredIcon from "../../assets/heart-filtered.svg";
import CommentIcon from "../../assets/comment.svg";
import ShareIcon from "../../assets/share.svg";
import InfoIcon from "../../assets/info.svg";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
        };

        this.handleNotification = this.handleNotification.bind(this);
    }

    handleNotification(type) {

        this.setState({liked: !this.state.liked}, () => {
            const {post, socket, user} = this.props;
            socket.emit("sendNotification", {
                senderName: user.username,
                receiverName: post.username,
                type
            })
        });
    }

    render() {
        const {post} = this.props;

        return (
            <div className="card">
                <div className="info">
                    <img src={post.userImg} alt="" className="userImg" />
                    <span>{post.fullName}</span>
                </div>
                <img src={post.postImg} alt="" className="postImg" />
                <div className="interaction">
                    {
                        this.state.liked ? (
                                <img src={HeartFilteredIcon} alt="" className="cardIcon" onClick={() => this.handleNotification(0)}/>
                        ) : (
                                <img src={HeartIcon} alt="" className="cardIcon" onClick={() => this.handleNotification(1)}/>
                        )
                    }

                    <img src={CommentIcon} alt="" className="cardIcon" />
                    <img src={ShareIcon} alt="" className="cardIcon" />
                    <img src={InfoIcon} alt="" className="cardIcon infoIcon" />
                </div>
            </div>
        );
    }
}

export default Card;
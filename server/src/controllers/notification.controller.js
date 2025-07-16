import { Notification } from "../models/notification.models.js";

const getAllNotifications = async (req, res) => {
  try {
    const recipientId = req.user._id;
    const allNotifications = await Notification.find({ recipientId }).sort({ createdAt: -1 }).lean();

    return res.status(200).json({data: allNotifications});
  } catch (error) {
    console.error("Error in getAllNotifications:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const markNotificationRead = async (req, res) => {
  try {
    const notifyId = req.params.id;

    const result = await Notification.findOneAndUpdate(
      { _id: notifyId },
      { isRead: true },
      {new: true}
    );

    if (!result) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("Error in markNotificationRead:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const notifyId = req.params.id;

    await Notification.deleteOne({ _id: notifyId });

    return res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNotification:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

  const countNotification = async (req, res) => {
    try {
      const userId = req.user._id;
      
      const count = await Notification.countDocuments({recipientId:userId, isRead:false});
      
      return res.status(200).json({count: count});
    } catch (error) {
      console.error("Error in countNotification:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

export {
  getAllNotifications,
  markNotificationRead,
  deleteNotification,
  countNotification
};

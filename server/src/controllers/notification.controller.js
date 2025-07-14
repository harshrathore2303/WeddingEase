import { Notification } from "../models/notification.models.js";

const getAllNotifications = async (req, res) => {
  try {
    const recipientId = req.user._id;
    const allNotifications = await Notification.find({ recipientId }).sort({ createdAt: -1 }).lean();

    return res.status(200).json({
      message: allNotifications.length ? "All Notifications" : "No new Notifications",
      notifications: allNotifications,
    });
  } catch (error) {
    console.error("Error in getAllNotifications:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const markNotificationRead = async (req, res) => {
  try {
    const recipientId = req.user._id;
    const notifyId = req.params.id;

    const result = await Notification.updateOne(
      { _id: notifyId, recipientId, isRead: false },
      { $set: { isRead: true } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (result.modifiedCount === 0) {
      return res.status(200).json({ message: "Notification already read" });
    }

    return res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("Error in markNotificationRead:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const markAllNotifications = async (req, res) => {
  try {
    const recipientId = req.user._id;

    const result = await Notification.updateMany(
      { recipientId, isRead: false },
      { $set: { isRead: true } }
    );

    return res.status(200).json({
      message: `${result.modifiedCount} notifications marked as read`,
    });
  } catch (error) {
    console.error("Error in markAllNotifications:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const recipientId = req.user._id;
    const notifyId = req.params.id;

    const result = await Notification.deleteOne({ _id: notifyId, recipientId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNotification:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteAllNotifications = async (req, res) => {
  try {
    const recipientId = req.user._id;

    const result = await Notification.deleteMany({ recipientId });

    return res.status(200).json({
      message: `${result.deletedCount} notifications deleted`,
    });
  } catch (error) {
    console.error("Error in deleteAllNotifications:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getNotificationSummary = async (req, res) => {
  try {
    const recipientId = req.user._id;

    const [total, unread, read, recent] = await Promise.all([
      Notification.countDocuments({ recipientId }),
      Notification.countDocuments({ recipientId, isRead: false }),
      Notification.countDocuments({ recipientId, isRead: true }),
      Notification.find({ recipientId }).sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    return res.status(200).json({
      message: "Notification summary fetched successfully",
      summary: {
        total,
        unread,
        read,
        recent,
      },
    });
  } catch (error) {
    console.error("Error in getNotificationSummary:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  getAllNotifications,
  markNotificationRead,
  markAllNotifications,
  deleteNotification,
  deleteAllNotifications,
  getNotificationSummary,
};

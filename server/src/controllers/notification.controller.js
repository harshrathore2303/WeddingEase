import { Notification } from "../models/notification.models.js";

const getAllNotifications = async (req, res) => {
  try {
    const ownerId = req.owner._id;
    const allNotification = await Notification.find({ ownerId: ownerId });
    if (allNotification.length == 0) {
      return res
        .status(200)
        .json({ message: "No new Notification", notifications: [] });
    }

    return res
      .status(200)
      .json({ message: "All Notifications", notifications: allNotification });
  } catch (error) {
    console.log("Error:::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const markNotificationRead = async (req, res) => {
  try {
    const ownerId = req.owner._id;
    const notifyId = req.params.id;
    const updateResult = await Notification.updateOne(
      { _id: notifyId, ownerId: ownerId, isRead: false },
      { $set: { isRead: true } }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ message: "Notification not found" });
    }
    if (updateResult.modifiedCount === 0) {
      return res.status(200).json({ message: "Notification already read" });
    }

    return res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    console.log("Error:::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const markAllNotifications = async (req, res) => {
  try {
    const ownerId = req.owner._id;
    const notifyId = req.params.id;
    const updateResult = await Notification.updateMany(
      { ownerId: ownerId, isRead: false },
      { $set: { isRead: true } }
    );

    return res.status(200).json({
      message: `${updateResult.modifiedCount} notifications marked as read`,
    });
  } catch (error) {
    console.log("Error:::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const ownerId = req.owner._id;
    const notifyId = req.params.id;

    const result = await Notification.deleteOne({ _id: notifyId, ownerId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res
      .status(200)
      .json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.log("Error:::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteAllNotifications = async (req, res) => {
  try {
    const ownerId = req.owner._id;

    const result = await Notification.deleteMany({ ownerId });

    return res.status(200).json({
      message: `${result.deletedCount} notifications deleted`,
    });
  } catch (error) {
    console.log("Error:::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getNotificationSummary = async (req, res) => {
  try {
    const ownerId = req.owner._id;

    const [total, unread, read, recent] = await Promise.all([
      Notification.countDocuments({ ownerId }),
      Notification.countDocuments({ ownerId, isRead: false }),
      Notification.countDocuments({ ownerId, isRead: true }),
      Notification.find({ ownerId }).sort({ createdAt: -1 }).limit(5),
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
    console.log("Error:::", error);
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

import { useState, useEffect } from "react";
import { Rate, Modal, Input, Button, message } from "antd";
import { TrophyFilled } from "@ant-design/icons";

export default function GuideCard({ guide }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  // Load saved reviews from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("guideReviews") || "{}");
    if (stored[guide.name]) {
      setReviews(stored[guide.name]);
    }
  }, [guide.name]);

  // Save reviews to localStorage
  const saveReviews = (newReviews) => {
    const stored = JSON.parse(localStorage.getItem("guideReviews") || "{}");
    stored[guide.name] = newReviews;
    localStorage.setItem("guideReviews", JSON.stringify(stored));
  };

  const handleSubmit = () => {
    if (!rating || !review.trim()) {
      message.warning("Please add both rating and review!");
      return;
    }

    const newReview = {
      rating,
      text: review.trim(),
      date: new Date().toLocaleDateString(),
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    saveReviews(updatedReviews);

    message.success("Review added successfully!");
    setIsAddModalOpen(false);
    setRating(0);
    setReview("");
    setIsViewModalOpen(true); // Open view modal after adding review
  };

  return (
    <div className="relative rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white">
      {/* Verified badge */}
      {guide.verified && (
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
          <TrophyFilled className="text-blue-500 text-lg" title="Verified Guide" />
        </div>
      )}

      <img src={guide.image} alt={guide.name} className="w-full h-44 object-cover" />

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{guide.name}</h3>
          <div className="text-sm text-slate-500">{guide.location}</div>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Rate disabled defaultValue={Math.round(guide.rating)} />
          <span className="text-slate-500 text-sm">({guide.rating.toFixed(1)})</span>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <Button type="primary" size="small" onClick={() => setIsAddModalOpen(true)}>
            Add Review
          </Button>

          {reviews.length > 0 && (
            <Button
              type="link"
              size="small"
              onClick={() => setIsViewModalOpen(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              View Reviews ({reviews.length})
            </Button>
          )}
        </div>
      </div>

      {/* Modal for adding review */}
      <Modal
        title={`Add Review for ${guide.name}`}
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsAddModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Submit
          </Button>,
        ]}
      >
        <div className="space-y-3">
          <div>
            <span className="block mb-1 font-medium">Your Rating:</span>
            <Rate onChange={setRating} value={rating} />
          </div>
          <div>
            <span className="block mb-1 font-medium">Your Review:</span>
            <Input.TextArea
              rows={4}
              placeholder="Share your experience..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
        </div>
      </Modal>

      {/* Modal for viewing reviews */}
      <Modal
        title={`Reviews for ${guide.name}`}
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {reviews.length === 0 ? (
          <p className="text-slate-500">No reviews yet.</p>
        ) : (
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {reviews.map((r, i) => (
              <div key={i} className="border rounded-lg p-2 bg-slate-50">
                <Rate disabled defaultValue={r.rating} className="text-xs" />
                <p className="text-sm text-slate-700 mt-1">{r.text}</p>
                <span className="text-xs text-slate-400 block text-right">{r.date}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}

import React from "react";
import { useSearchParams } from "react-router-dom";

const ConfirmPage = () => {
  const [searchParams] = useSearchParams();
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  return (
    <div className="font-medium text-lg">
      Your booking has been confirmed for dates.
      <article>
        <p>
          Start: <em>{start}</em>
        </p>
        <p>
          End: <em>{end}</em>
        </p>
      </article>
      Thank You for considering us.
    </div>
  );
};

export default ConfirmPage;

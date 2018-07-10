import Preact from "preact";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faArrowAltCircleLeft
} from "@fortawesome/free-regular-svg-icons";

const Pagination = ({ onClick, currentPage, totalPages }) => {
  return (
    <div className="pagination">
      <button
        onClick={() => onClick("prev")}
        className={`btn pagination__btn ${
          currentPage <= 0 ? "pagination__btn--fade" : ""
        }`}
      >
        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
      </button>
      <p className="pagination-copy">
        Page {currentPage} of {totalPages}
      </p>
      <button
        onClick={() => onClick("next")}
        className={`btn pagination__btn ${
          currentPage >= totalPages ? "pagination__btn--fade" : ""
        }`}
      >
        <FontAwesomeIcon icon={faArrowAltCircleRight} />
      </button>
    </div>
  );
};

export default Pagination;

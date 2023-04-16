import React, { useState, useRef, useEffect } from 'react';
import { diff_match_patch } from 'diff-match-patch';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TextCompare.css';

interface TextCompareProps {
  leftText: string;
  rightText: string;
}

const TextCompare: React.FC<TextCompareProps> = ({ leftText, rightText }) => {
  const [leftValue, setLeftValue] = useState<string>(leftText);
  const [rightValue, setRightValue] = useState<string>(rightText);
  const diffRef = useRef<HTMLDivElement>(null);

  const dmp = new diff_match_patch();

  useEffect(() => {
    highlightDifferences(leftText, rightText);
  }, [leftText, rightText]);

  const handleLeftChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setLeftValue(newValue);
    highlightDifferences(newValue, rightValue);
  };

  const handleRightChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setRightValue(newValue);
    highlightDifferences(leftValue, newValue);
  };

  const highlightDifferences = (leftText: string, rightText: string) => {
    const diffs = dmp.diff_main(leftText, rightText);
    dmp.diff_cleanupSemantic(diffs);
    const diffHtml = dmp.diff_prettyHtml(diffs);

    if (diffRef.current) {
      diffRef.current.innerHTML = diffHtml;
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="row">
        <div className="col-md-6">
          <textarea className="form-control" value={leftValue} onChange={handleLeftChange} rows={10}/>
        </div>
        <div className="col-md-6">
          <textarea className="form-control" value={rightValue} onChange={handleRightChange} rows={10} />
        </div>
        <div className="col-md-12 mt-3">
          <div ref={diffRef} className="form-control" style={{ whiteSpace: 'pre-wrap' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TextCompare;

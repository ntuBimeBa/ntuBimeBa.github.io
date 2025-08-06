import { useState } from "react";
import { Button } from "../ui/button";

const DashboardLegacyFileItem = ({ file }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border rounded p-4">
      <div className="flex justify-between cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <span className="font-semibold">{file.name}</span>
        <span className="text-sm text-muted-foreground">{file.uploadedAt}</span>
      </div>
      {expanded && (
        <div className="mt-2 text-sm space-y-1">
          <Detail label="屆數/學年" value={file.year} />
          <Detail label="年級" value={file.grade} />
          <Detail label="學期" value={["上", "下", "暑修"][file.semester - 1]} />
          <Detail label="授課教師" value={file.teacher} />
          <Detail label="科目" value={file.subject} />
          <Detail label="課程代碼" value={file.code} />
          <Detail label="類型" value={file.type} />
          <Detail label="描述" value={file.description} />
          <Button variant="destructive" className="flex mx-auto" size="sm" onClick={() => deleteFile(file.id)}>刪除</Button>
        </div>
      )}
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span>{value}</span>
  </div>
);

const deleteFile = (id) => {
  // 執行刪除
  alert(`刪除檔案 ID：${id}`);
};

export default DashboardLegacyFileItem;

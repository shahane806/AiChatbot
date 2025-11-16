import React, { useState } from "react";
import { filesize } from "filesize";
import Skeleton from "@mui/material/Skeleton";
import { IoMdCloudDownload } from "react-icons/io";
import { saveAs } from "file-saver";
const TSI = ({ chat, loadingChat, chatImgStyle, _id }) => {
  const [s, setInput] = useState("");
  return (
    <div className="right_chat" id="rightChat">
      {chat.length == 0 && (
        <div
          style={{
            margin: "30% auto",
            textAlign: "center",
            display: "flex",
            fontFamily: "sans-serif",
          }}
        >
        <span> Hello This is Digit Recognization Machine Learning Model 
          How to use it : 
           Input : number image 
           Output : label out of this {"0,1,2,3,4,5,6,7,8,9"}</span>
        </div>
      )}

      {chat?.map((value, index) => {
        const aiChat =
          value?.payload?.[0]?.destination?.split("./uploads/")[1] != _id &&
          !value?.payload?.[2];
        const attachmentImageUrl =
          process.env.REACT_APP_REST_API_BASE_URL +
          "/uploads/" +
          value?.payload?.[0]?.destination?.split("./uploads/")[1] +
          "/" +
          value?.payload?.[0]?.filename;
        console.log(
          process.env.REACT_APP_REST_API_BASE_URL +
            "/uploads/" +
            value?.payload?.[0]?.destination?.split("./uploads/")[1] +
            "/" +
            value?.payload?.[0]?.filename
        );

        if (typeof value?.payload?.[0] === "object") {
          return aiChat ? (
            <div
              key={index + value?.payload?.[0]?.filename}
              className="right_chat_1 attachment"
              style={{
                borderTopRightRadius: "10px",
                borderTopLeftRadius: "0px",
                alignItems: "start",
                justifyItems: "start",
                maxWidth: "50%",
                marginLeft: "5px",
              }}
            >
              {index + 1 != chat.length ? (
                <>
                  {(value?.payload?.[0]?.mimetype == "image/png" ||
                    value?.payload?.[0]?.mimetype == "image/jpg" ||
                    value?.payload?.[0]?.mimetype == "image/jpeg") && (
                    <img
                      style={chatImgStyle}
                      src={attachmentImageUrl}
                      alt={value?.payload?.[0]?.filename}
                    />
                  )}

                  <span>
                    {value?.payload?.[1].toString().split("GMT")[0] +
                      ""}
                  </span>
                </>
              ) : index + 1 == chat.length && !loadingChat ? (
                <>
                  {(value?.payload?.[0]?.mimetype == "image/png" ||
                    value?.payload?.[0]?.mimetype == "image/jpg" ||
                    value?.payload?.[0]?.mimetype == "image/jpeg") && (
                    <img
                      style={chatImgStyle}
                      src={attachmentImageUrl}
                      alt={value?.payload?.[0]?.filename}
                    />
                  )}

                  <span>
                    {value?.payload?.[1].toString().split("GMT")[0] +
                      ""}
                  </span>
                </>
              ) : (
                <>
                  <Skeleton
                    variant="rounded"
                    width={"100%"}
                    height={100}
                    animation="progress"
                    style={{
                      marginTop: "-5px",
                    }}
                  />
                </>
              )}
            </div>
          ) : (
            <div
              key={index + value?.payload?.[0]?.filename}
              className="right_chat_1 attachment"
              style={{
                alignItems: "end",
                marginLeft: "50%",

                justifyItems: "end",
                maxWidth: "80%",
              }}
            >
              {(value?.payload?.[0]?.mimetype == "image/png" ||
                value?.payload?.[0]?.mimetype == "image/jpg" ||
                value?.payload?.[0]?.mimetype == "image/jpeg") && (
                <img
                  style={chatImgStyle}
                  src={attachmentImageUrl}
                  alt={value?.payload?.[0]?.filename}
                  onClick={()=>{
                    let link = document.createElement('a');
                    link.href = process.env.REACT_APP_REST_API_BASE_URL +
                    "/uploads/" +
                    value?.payload?.[0]?.destination?.split(
                      "./uploads/"
                    )[1] +
                    "/" +
                    value?.payload?.[0]?.filename;
                    link.target = "_blank";
                    link.click();
                  }}
                />
              )}
              <span>
                <IoMdCloudDownload
                  fontSize={"25px"}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    saveAs(
                      process.env.REACT_APP_REST_API_BASE_URL +
                        "/uploads/" +
                        value?.payload?.[0]?.destination?.split(
                          "./uploads/"
                        )[1] +
                        "/" +
                        value?.payload?.[0]?.filename,
                      value?.payload?.[0]?.filename
                    );
                  }}
                />

                <span style={{ color: "#397fdd" }}>
                  {filesize(value?.payload?.[0]?.size, { standard: "jedec" })}
                </span>
                {" " + value?.payload?.[1].toString().split("GMT")[0]}
              </span>
            </div>
          );
        }
        if (typeof value?.payload?.[0] === "string") {
          return aiChat ? (
            <div
              key={index + value?.payload?.[0]}
              className="right_chat_1"
              style={{
                borderTopRightRadius: "10px",
                borderTopLeftRadius: "0px",
                alignItems: "start",
                justifyItems: "start",
                maxWidth: "50%",
                marginLeft: "5px",
              }}
            >
              {index + 1 != chat.length ? (
                <>
                  {
                    <p
                      dangerouslySetInnerHTML={{ __html: value?.payload?.[0] }}
                      autoFocus
                    ></p>
                  }

                  <span>
                    {value?.payload?.[1].toString().split("GMT")[0] +
                      ""}
                  </span>
                </>
              ) : index + 1 == chat.length && !loadingChat ? (
                <>
                  {
                    <p
                      dangerouslySetInnerHTML={{ __html: value?.payload?.[0] }}
                      autoFocus
                    ></p>
                  }
                  {console.log(value?.payload?.[0])}

                  <span>
                    {value?.payload?.[1].toString().split("GMT")[0] +
                      ""}
                  </span>
                </>
              ) : (
                <>
                  <Skeleton
                    variant="rounded"
                    width={"100%"}
                    height={100}
                    animation="wave"
                    style={{
                      marginTop: "-5px",
                    }}
                  />
                </>
              )}
            </div>
          ) : (
            <div
              key={index + value?.payload?.[0]}
              className="right_chat_1"
              style={{
                alignItems: "end",
                marginLeft: "50%",

                justifyItems: "end",
                maxWidth: "80%",
              }}
            >
              <p>{value?.payload?.[0]}</p>
              <span>{value?.payload?.[1].toString().split("GMT")[0]}</span>
            </div>
          );
        }
      })}
    </div>
  );
};

export default TSI;

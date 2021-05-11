# 阿里云图片处理
## 1. x-oss-process=image/resize,m_fill,w_782,h_540
> 阿里云OSS,图片资源缩略图实现方法;
## 2. x-oss-process=video/snapshot,t_7000,f_jpg,w_800,h_600,m_fast
> * t_ 后面配置截取多少毫秒的视频对应的画面
> * 后续的参数和图片同理。
> * 同样需要是阿里云OSS，使用此后缀拼接原本url，才能截取视频画面。
## 3. x-oss-process=image/quality,q_60 
> 设置图片清晰度最后就是清晰度0-100，数字越大，清晰度越高
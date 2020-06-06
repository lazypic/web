# Web
- Lazypic 홈페이지 소스코드입니다. : https://lazypic.org
- 이 코드는 AWS S3 + CloudFront + Route53을 이용해서 서비스되고 있습니다.
- 한달 200~300원의 운용비용을 목표로 코드가 작성되고 있습니다. CDN 리소스를 최대한 많이 사용해주세요.

#### 배포
배포를 위해서 AWS CLI 설치가 필요합니다.

```bash
$ pip install awscli
$ ./publish
```

또한 admin@lazypic.org 를 통해서 AWS 배포 S3 Write 키를 발급받아야 합니다.

#### Reference
- bootstrap : https://getbootstrap.com/docs/4.1/components/alerts/
- fontawesome : https://fontawesome.com/icons?d=gallery

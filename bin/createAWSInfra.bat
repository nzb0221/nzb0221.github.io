@SET a=@
mkdir infra
cd infra
npm install cdk -g
cdk init
code .
npm install --save-dev @aws-cdk/aws-s3 
npm install --save-dev @aws-cdk/aws-s3-deployment

%a% REM had to manually upload
%a% REM all artficats cause too big from CDK perspective!
 
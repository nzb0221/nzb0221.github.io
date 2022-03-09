# How to run the geTokenTest.sh bash shell POC

## Introduction

In order to truly understand the OIDC/OAuth protocol in action one must look at the network communication that takes place between the client, IDP, and Resource.

The script located in the bash directory of this project attempt to break these calls down specifically for the client credentials grant type case in the oidc/oauth realm.

## Setup and Execution

The script is initiated by sourcing a configuration file.
This configuration file must exist in the same location as the "getTokenTest.sh" script and be called ".getTokenTest-secrets.sh". So first copy the getTokenTest-secrets-sample.sh to .getTokenTest-secrets.sh.

Modify the values between the bra-ket notation to your corresonding values.

```shell
#!/bin/sh

export yourOktaDomain="<Replace With Your Okta Domain/>"
export serverID="<Replace with Okta Authorization Server ID/>"
export clientID="<Replace with Application Client ID/>"
export clientSecret="<Replace with Application Secret ID/>"

export scopes="<Replace with Scope list, use space delimeter between scopes/>"
export state="<Replace with state value, usually nonce will do/>"
```

to forexample:

```shell
#!/bin/sh

export yourOktaDomain="tmic.okta.com"
export serverID="aus1ggawgaxKEjNfO1d8"
export clientID="0oa1gkpibi3fAgvNn1d8"
export clientSecret="SDXKyq0frtN5qwEAd-q8ZXeivT0FOPI8AlmjU986"

export scopes="mulepoc.view mulepoc.edit"
export state="nonce"
```

Execute the script as follows:

```shell
./getTokenTest.sh
```

Below is a video showing as a demo of the same steps:

![Alt Text](images\bash\getTokenTest.gif)


[Go Back to Main README](../README.md)
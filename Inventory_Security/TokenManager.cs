﻿using System;
using System.Security.Cryptography;
using System.Text;
using Newtonsoft.Json;
using Inventory_Security.SecurityModel;

namespace Inventory_Security
{
    public class TokenManager
    {
        public static string EncodeToken(JwtPayload jwtPayload, string secret)
        {
            const string algorithm = "HMAC256";

            var header = new JwtHeader
            {
                typ = "JWT",
                alg = algorithm
            };

            var jwt = Base64Encode(JsonConvert.SerializeObject(header)) + "." + Base64Encode(JsonConvert.SerializeObject(jwtPayload));

            jwt += "." + Sign(jwt, secret);

            return jwt;
        }
        public static JwtPayload DecodeToken(string token, string secret, out bool validated)
        {
            var jwtPayload = new JwtPayload();

            var segments = token.Split('.');

            var invalidToken = segments.Length != 3;

            if (!invalidToken)
            {
                try
                {
                    jwtPayload = JsonConvert.DeserializeObject(
                        Encoding.UTF8.GetString(Base64Decode(segments[1])), typeof(JwtPayload));

                    var rawSignature = segments[0] + '.' + segments[1];

                    validated = Verify(rawSignature, secret, segments[2]);
                }
                catch (Exception)
                {
                    validated = false;
                }
            }
            else
            {
                validated = false;
            }

            return jwtPayload;
        }
        private static bool Verify(string rawSignature, string secret, string signature)
        {
            return signature == Sign(rawSignature, secret);
        }
        private static string Sign(string str, string key)
        {
            var encoding = new ASCIIEncoding();

            byte[] signature;

            using (var crypto = new HMACSHA256(encoding.GetBytes(key)))
            {
                signature = crypto.ComputeHash(encoding.GetBytes(str));
            }

            return Base64Encode(signature);
        }
        public static string Base64Encode(dynamic obj)
        {
            Type strType = obj.GetType();

            var base64EncodedValue = Convert.ToBase64String(strType.Name.ToLower() == "string" ? Encoding.UTF8.GetBytes(obj) : obj);

            return base64EncodedValue;
        }
        public static dynamic Base64Decode(string str)
        {
            var base64DecodedValue = Convert.FromBase64String(str);

            return base64DecodedValue;
        }
        public static int GetUserIdentity(string token)
        {
            bool validated;

            string secret = Base64Encode(SecurityConstants.KeyForHmacSha256);

            var decodedPayload = DecodeToken(token, secret, out validated);

            return validated ? Int32.Parse(decodedPayload.sub) : -1;
        }
        public static string GetUserType(string token)
        {
            bool validated;

            string secret = Base64Encode(SecurityConstants.KeyForHmacSha256);

            var decodedPayload = DecodeToken(token, secret, out validated);

            return validated ? decodedPayload.uty : null;
        }

        public static string GetContactName(string token)
        {
            bool validated;

            string secret = Base64Encode(SecurityConstants.KeyForHmacSha256);

            var decodedPayload = DecodeToken(token, secret, out validated);

            return validated ? decodedPayload.acn : null;
        }
        public static int GetGroupId(string token)
        {
            bool validated;

            string secret = Base64Encode(SecurityConstants.KeyForHmacSha256);

            var decodedPayload = DecodeToken(token, secret, out validated);

            return validated ? Int32.Parse(decodedPayload.gri) : -1;
        }
        public static int GetBranchId(string token)
        {
            bool validated;

            string secret = Base64Encode(SecurityConstants.KeyForHmacSha256);

            var decodedPayload = DecodeToken(token, secret, out validated);

            return validated ? Int32.Parse(decodedPayload.bci) : -1;
        }
        public static int GetDefaultBranch(string token)
        {
            bool validated;

            string secret = Base64Encode(SecurityConstants.KeyForHmacSha256);

            var decodedPayload = DecodeToken(token, secret, out validated);

            //return validated ? Int32.Parse(decodedPayload.dbi) : -1;


            return validated ? Int32.Parse(decodedPayload.bci) : -1;
        }

    }
}

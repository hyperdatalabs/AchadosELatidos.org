import { Box, Grid, Link, Typography } from "@mui/material";

const Footer = () => (
  <Grid container sx={{ my: 4, mt: 10 }}>
    <Grid item xs={4}>
      <Link href="https://thinkaigroup.com/" target="__blank">
        <Box
          component="img"
          sx={{ width: "5rem", textAlign: "center" }}
          md={{ display: "block", margin: "auto" }}
          src="https://thinkaigroup.com/wp-content/uploads/2024/04/apl-principal-02-para-fundos-escuros-1024x270.webp"
        />
      </Link>
    </Grid>
    <Grid item xs={4}>
      <Typography sx={{ textAlign: "center", fontSize: "small" }}>
        Feito com 💚
      </Typography>
    </Grid>
    <Grid item xs={4}>
      <Link href="https://thinkaigroup.com" target="__blank">
        <Typography sx={{ textAlign: "center", fontSize: "small" }}>
          Conheça a Think:AI
        </Typography>
      </Link>
    </Grid>
  </Grid>
);

export default Footer;

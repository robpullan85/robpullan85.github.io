// Initial variables declared, slides will store all pictures
var slides = document.getElementsByClassName("homePageCatSlideShowPicture")
var n = 0;

// displays the first picture of the slideshow on pageload
window.onload = onPageLoad;


// function to display the first picture of slideshow
function onPageLoad()
{
  slides[0].style.display = "block";
}

// function to see the previous image in the slideshow
function leftSlideShow()
{
  n--;
  if (n < 0)
  {
    n = (slides.length - 1);
    slides[0].style.display = "none";
    slides[n].style.display = "block";
  }
  else
  {
    slides[n+1].style.display = "none";
    slides[n].style.display = "block";
  }
}

// function to see the next image in the slideshow
function rightSlideShow()
{
  n++;
  if (n > (slides.length - 1))
  {
    n = 0;
    slides[slides.length - 1].style.display = "none";
    slides[n].style.display = "block";
  }
  else
  {
    slides[n-1].style.display = "none";
    slides[n].style.display = "block";
  }
}
